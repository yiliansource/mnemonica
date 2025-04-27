import { Suit } from "@/lib/deck";
import clsx from "clsx";
import { GiClubs, GiDiamonds, GiHearts, GiSpades } from "react-icons/gi";

const SUIT_TO_ICON: Record<Suit, React.ComponentType> = {
    S: GiSpades,
    H: GiHearts,
    D: GiDiamonds,
    C: GiClubs,
};

export function CardSuit({ suit }: { suit: Suit }) {
    const Icon = SUIT_TO_ICON[suit];
    const isRed = suit === "H" || suit === "D";

    return (
        <span className={clsx(isRed ? "text-red-500" : "text-neutral-200")}>
            <Icon />
        </span>
    );
}
