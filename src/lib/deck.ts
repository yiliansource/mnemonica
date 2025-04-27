export type Face = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
export type Suit = "H" | "D" | "S" | "C";

export const FACES: Face[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
export const SUITS: Suit[] = ["H", "D", "S", "C"];

export type CardColor = "R" | "B";
export type Card = [Face, Suit];
export type Deck = Card[];

export type MaybeCard = [Face | null, Suit | null];

export function parseDeck(s: string): Deck | null {
    const parsedCards = s.split(",").map(parseCard);
    if (parsedCards.some((c) => !c)) return null;

    return parsedCards as Deck;
}
export function stringifyDeck(d: Deck): string {
    return d.map(stringifyCard).join(",");
}

export function parseCard(s: string): Card | null {
    const result = s.match(/^([A2-9JKQ]|10)([CHSD])$/);
    if (!result) return null;

    return [result[1] as Face, result[2] as Suit];
}
export function stringifyCard(c: Card): string {
    return c.join("");
}

export function getCardColor(c: Card): CardColor {
    const [, suit] = c;
    switch (suit) {
        case "H":
        case "D":
            return "R";
        case "S":
        case "C":
            return "B";
    }
}
