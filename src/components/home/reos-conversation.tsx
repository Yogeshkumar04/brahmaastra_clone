"use client";

import { useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Pause, Play, RotateCcw } from "lucide-react";
import type { ChatMessage } from "@/types/content";
import { reosCycleDuration, reosFrameAt, type ReosFrame } from "@/lib/reos-playback";
import { useHydrated, useMotionDisabled, usePageVisible } from "@/components/motion/use-motion-permission";

gsap.registerPlugin(useGSAP, ScrollTrigger);
type State = { frame: ReosFrame; playing: boolean; epoch: number };
type Action = { type: "tick"; frame: ReosFrame } | { type: "toggle" } | { type: "replay"; frame: ReosFrame };
function reducer(state: State, action: Action): State {
  if (action.type === "toggle") return { ...state, playing: !state.playing };
  if (action.type === "replay") return { frame: action.frame, playing: true, epoch: state.epoch + 1 };
  const frame = action.frame;
  return frame.index === state.frame.index && frame.characters === state.frame.characters && frame.phase === state.frame.phase ? state : { ...state, frame };
}

export function ReosConversation({ messages }: { messages: readonly ChatMessage[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const chat = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Tween | null>(null);
  const elapsed = useRef(0);
  const hydrated = useHydrated();
  const disabled = useMotionDisabled();
  const enabled = hydrated && !disabled;
  const pageVisible = usePageVisible();
  const [state, dispatch] = useReducer(reducer, { frame: reosFrameAt(messages, 0), playing: true, epoch: 0 });
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  // Disable state callbacks before useGSAP reverts the clock to its starting value.
  useLayoutEffect(() => () => { timeline.current?.eventCallback("onUpdate", null); }, [enabled, state.epoch, messages]);
  // One numeric clock; React owns every message and character. No DOM cloning.
  useGSAP(() => {
    if (!enabled || !scope.current || !messages.length) return;
    const section = scope.current.closest<HTMLElement>("#reos-section")!;
    const clock = { elapsed: 0 };
    const total = reosCycleDuration(messages);
    const tween = gsap.to(clock, { elapsed: total, duration: total / 1000, ease: "none", repeat: -1, paused: true,
      onUpdate: () => { elapsed.current = clock.elapsed; dispatch({ type: "tick", frame: reosFrameAt(messages, clock.elapsed) }); } });
    tween.time((elapsed.current % total) / 1000, true);
    timeline.current = tween;
    const trigger = ScrollTrigger.create({ trigger: section, start: "top bottom", end: "bottom top", onToggle: self => setActive(self.isActive), onRefresh: self => setActive(self.isActive) });
    setActive(trigger.isActive);
    return () => { timeline.current = null; };
  }, { scope, dependencies: [enabled, state.epoch, messages], revertOnUpdate: true });

  useEffect(() => { timeline.current?.paused(!state.playing || !active || !pageVisible || hovered || focused || transcriptOpen); }, [enabled, state.epoch, state.playing, active, pageVisible, hovered, focused, transcriptOpen]);
  useLayoutEffect(() => {
    if (enabled && chat.current && !hovered && !focused && !transcriptOpen) chat.current.scrollTop = chat.current.scrollHeight;
  }, [enabled, state.frame, hovered, focused, transcriptOpen]);
  const { frame } = state;
  const complete = frame.phase === "holding" || frame.phase === "reset";
  return <div ref={scope} className="reos-conversation" data-playback={enabled ? state.playing ? "playing" : "paused" : "static"} data-frame={`${frame.index}:${frame.phase}:${frame.characters}`}>
    {enabled && <div className="reos-controls" role="group" aria-label="Conversation playback controls">
      <button type="button" onClick={() => { if (state.playing) timeline.current?.pause(); dispatch({ type: "toggle" }); }} aria-label={state.playing ? "Pause conversation" : "Play conversation"}>{state.playing ? <Pause size={14} /> : <Play size={14} />}{state.playing ? "Pause" : "Play"}</button>
      <button type="button" onClick={() => { timeline.current?.pause(); elapsed.current = 0; setTranscriptOpen(false); dispatch({ type: "replay", frame: reosFrameAt(messages, 0) }); }}><RotateCcw size={14} />Replay</button>
    </div>}
    <div ref={chat} className="reos-chat" data-lenis-prevent role="region" tabIndex={0} aria-label="Example REOS conversation"
      onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => setFocused(event.currentTarget.contains(event.relatedTarget))}>
      {enabled && <ol className="reos-playback" aria-hidden="true">{messages.slice(0, frame.index + 1).map((message, index) => <li className="reos-message" data-sender={message.sender} key={index}>
        <span className="reos-message__sender">{message.sender === "user" ? "You" : "REOS AI"}</span>
        <p className={index === frame.index && frame.phase === "typing" ? "typing-caret" : undefined}>{index < frame.index || complete ? message.text : frame.phase === "thinking" ? <span className="reos-typing-dots"><i /><i /><i /></span> : message.text.slice(0, frame.characters)}</p>
      </li>)}</ol>}
      <details className={`reos-transcript ${enabled ? "reos-transcript-enhanced" : ""}`} open={!enabled || transcriptOpen} onToggle={event => { if (enabled) setTranscriptOpen(event.currentTarget.open); }}>
        <summary>Read full example conversation</summary><ol>{messages.map((message, index) => <li className="reos-message" data-sender={message.sender} key={index}><span className="reos-message__sender">{message.sender === "user" ? "You" : "REOS AI"}</span><p>{message.text}</p></li>)}</ol>
      </details>
    </div>
    <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{enabled && complete && frame.index >= 0 ? `${messages[frame.index].sender === "user" ? "You" : "REOS AI"}: ${messages[frame.index].text}` : ""}</p>
  </div>;
}
