"use client";

import { CardInput } from "@/components/card-input";
import { CardLabel } from "@/components/card-label";
import { CardSuit } from "@/components/card-suit";
import { Card, MaybeCard, stringifyCard } from "@/lib/deck";
import { MNEMONICA } from "@/lib/mnemonica";
import { useTrainerStats } from "@/lib/trainer";
import { useAtom } from "jotai";
import { atomWithImmer, useImmerAtom } from "jotai-immer";
import { useCallback, useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa";

const currentCardAtom = atomWithImmer(null as Card | null);
const nextCardAtom = atomWithImmer(null as Card | null);
const inputCardAtom = atomWithImmer([null, null] as MaybeCard);

export default function NextCardTrainer() {
    const [trainerStats, setTrainerStats] = useTrainerStats();
    const [currentCard, setCurrentCard] = useAtom(currentCardAtom);
    const [nextCard, setNextCard] = useAtom(nextCardAtom);
    const [inputCard, setInputCard] = useAtom(inputCardAtom);
    const [isFalsey, setIsFalsey] = useState(false);

    const generateNewCard = useCallback(() => {
        const currentIndex = Math.floor(Math.random() * MNEMONICA.length);
        const nextIndex = (currentIndex + 1) % MNEMONICA.length;

        setCurrentCard(MNEMONICA[currentIndex]);
        setNextCard(MNEMONICA[nextIndex]);
    }, [setCurrentCard, setNextCard]);

    useEffect(() => {
        generateNewCard();
    }, [generateNewCard]);

    useEffect(() => {
        const [face, suit] = inputCard;
        if (!face || !suit) {
            setIsFalsey(false);
            return;
        }

        if (stringifyCard(nextCard!) === stringifyCard(inputCard as Card)) {
            generateNewCard();
            setInputCard([null, null]);
            setTrainerStats((stats) => {
                stats.passed++;
            });
            setIsFalsey(false);
        } else {
            setIsFalsey(true);
        }
    }, [generateNewCard, inputCard, nextCard, setInputCard, setTrainerStats]);

    return (
        <>
            <div className="mb-8">
                <h1 className="mb-2 text-4xl font-bold">Next Card(s)</h1>
                <p className="text-neutral-300">Enter the card that will come next.</p>
            </div>
            <div className="mx-auto py-8">
                <div className="flex flex-row items-center gap-4 mx-auto">
                    <div className="text-6xl w-28 flex items-center justify-center">
                        {currentCard && <CardLabel card={currentCard} />}
                    </div>
                    <div className="text-4xl font-bold text-neutral-700">
                        <FaCaretRight />
                    </div>
                    <div className="text-6xl w-28 flex items-center justify-center">
                        <span className="inline-flex flex-row gap-0.5 items-center font-semibold">
                            {inputCard[0] ? <span>{inputCard[0]}</span> : "_"}
                            {inputCard[1] ? <CardSuit suit={inputCard[1]} /> : "_"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="text-sm text-neutral-700">
                <p>Passed: {trainerStats.passed}</p>
                {/* <p>Failed: {trainerStats.failed}</p> */}
            </div>
            <div className="mx-auto py-4">
                <CardInput
                    highlightedFace={inputCard[0] ?? undefined}
                    highlightedSuit={inputCard[1] ?? undefined}
                    falsey={isFalsey}
                    onFaceInput={(f) =>
                        setInputCard((card) => {
                            card[0] = card[0] === f ? null : f;
                        })
                    }
                    onSuitInput={(s) =>
                        setInputCard((card) => {
                            card[1] = card[1] === s ? null : s;
                        })
                    }
                />
            </div>
        </>
    );
}
