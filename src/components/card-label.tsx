import { Card } from "@/lib/deck";
import { CardSuit } from "./card-suit";

export function CardLabel({ card }: { card: Card }) {
    const [face, suit] = card;

    return (
        <span className="inline-flex flex-row gap-0.5 items-center font-semibold">
            <span>{face}</span>
            <span className="text">
                <CardSuit suit={suit} />
            </span>
        </span>
    );
}
