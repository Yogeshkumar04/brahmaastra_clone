import type { ChatMessage } from "@/types/content";

export type ReosFrame = Readonly<{ index: number; characters: number; phase: "thinking" | "typing" | "holding" | "reset" }>;
export const reosTiming = { userCharacter: 35, aiCharacter: 30, thinking: 1100, userHold: 700, aiHold: 2200, reset: 2500 } as const;
const duration = (message: ChatMessage) => (message.sender === "ai" ? reosTiming.thinking : 0) + message.text.length * (message.sender === "ai" ? reosTiming.aiCharacter : reosTiming.userCharacter) + (message.sender === "ai" ? reosTiming.aiHold : reosTiming.userHold);
export const reosCycleDuration = (messages: readonly ChatMessage[]) => messages.reduce<number>((total, message) => total + duration(message), reosTiming.reset);

/** A pure frame projection: identical elapsed time always renders identical text. */
export function reosFrameAt(messages: readonly ChatMessage[], elapsed: number): ReosFrame {
  if (!messages.length) return { index: -1, characters: 0, phase: "reset" };
  let remaining = ((elapsed % reosCycleDuration(messages)) + reosCycleDuration(messages)) % reosCycleDuration(messages);
  for (let index = 0; index < messages.length; index++) {
    const message = messages[index];
    const thinking = message.sender === "ai" ? reosTiming.thinking : 0;
    const rate = message.sender === "ai" ? reosTiming.aiCharacter : reosTiming.userCharacter;
    const typing = message.text.length * rate;
    if (remaining < thinking) return { index, characters: 0, phase: "thinking" };
    if (remaining < thinking + typing) return { index, characters: Math.floor((remaining - thinking) / rate), phase: "typing" };
    if (remaining < duration(message)) return { index, characters: message.text.length, phase: "holding" };
    remaining -= duration(message);
  }
  return { index: messages.length - 1, characters: messages.at(-1)!.text.length, phase: "reset" };
}
