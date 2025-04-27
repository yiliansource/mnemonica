import Link from "next/link";

const trainers: {
    name: string;
    description?: string;
    slug: string;
}[] = [
    {
        name: "Deck Order",
        description: "Revise the order of the stack.",
        slug: "deck-order",
    },
    {
        name: "Card to Number",
        slug: "card-to-number",
    },
    {
        name: "Number to Card",
        slug: "number-to-card",
    },
    {
        name: "Next Card(s)",
        slug: "next-cards",
    },
];

export default function TrainersPage() {
    return (
        <>
            <div className="mb-2">
                <h1 className="mb-2 text-4xl font-bold">Trainers</h1>
                {/* <p className="text-neutral-300">Enter the card that will come next.</p> */}
            </div>
            <div>
                {trainers.map((trainer) => (
                    <Link key={trainer.slug} href={"/trainers/" + trainer.slug}>
                        <div className="py-2">
                            <h3 className="text-lg font-bold">{trainer.name}</h3>
                            <p className="text-neutral-300">{trainer.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
