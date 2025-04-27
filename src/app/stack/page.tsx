import { CardLabel } from "@/components/card-label";
import { chunkArray } from "@/lib/collections";
import { stringifyCard } from "@/lib/deck";
import { MNEMONICA } from "@/lib/mnemonica";

export default function StackPage() {
    const chunkSize = 52 / 4;
    const parts = chunkArray(MNEMONICA, chunkSize);

    return (
        <>
            <div className="mb-8">
                <h1 className="mb-2 text-4xl font-bold">The Stack</h1>
                <p className="text-neutral-300">
                    The following order represents the Mnemonica stack, as published by Juan Tamariz.
                </p>
            </div>
            <div className="flex flex-row mx-auto">
                {parts.map((part, i) => (
                    <div key={i} className="flex flex-col gap-2 not-last:border-r border-r-neutral-900 px-2 py-1">
                        {part.map((c, j) => (
                            <div key={stringifyCard(c)} className="flex flex-row justify-between items-center w-14">
                                <span className="mr-2 text-xs text-neutral-500">{1 + i * chunkSize + j}</span>
                                <CardLabel card={c} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}
