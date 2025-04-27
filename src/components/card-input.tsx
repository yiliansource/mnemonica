import { Face, FACES, Suit, SUITS } from "@/lib/deck";
import clsx from "clsx";
import { CardSuit } from "./card-suit";

export interface CardInputProps {
    highlightedFace?: Face;
    highlightedSuit?: Suit;
    falsey?: boolean;

    onFaceInput?: (face: Face) => void;
    onSuitInput?: (suit: Suit) => void;
}

export function CardInput({ highlightedFace, highlightedSuit, falsey, onSuitInput, onFaceInput }: CardInputProps) {
    return (
        <div className="flex flex-row gap-4">
            <div className="grid grid-rows-5 grid-flow-col gap-1">
                {FACES.map((f) => (
                    <SmallButton
                        key={f}
                        highlighted={f === highlightedFace}
                        falsey={falsey}
                        onMouseDown={() => onFaceInput?.(f)}
                    >
                        {f}
                    </SmallButton>
                ))}
            </div>
            <div className="grid grid-flow gap-1">
                {SUITS.map((s) => (
                    <SmallButton
                        key={s}
                        highlighted={s === highlightedSuit}
                        falsey={falsey}
                        onMouseDown={() => onSuitInput?.(s)}
                    >
                        <CardSuit suit={s} />
                    </SmallButton>
                ))}
            </div>
        </div>
    );
}

function SmallButton({
    className,
    highlighted,
    falsey,
    ...props
}: React.ComponentProps<"button"> & { highlighted?: boolean; falsey?: boolean }) {
    return (
        <button
            className={clsx(
                "inline-flex flex-row items-center justify-center w-12 py-1 text-neutral-300 font-bold rounded-md",
                className,
                highlighted ? (falsey ? "bg-red-900" : "bg-neutral-700") : "bg-neutral-900",
            )}
            {...props}
        ></button>
    );
}
