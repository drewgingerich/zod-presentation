import { z } from "zod";

const personSchema = z.object({
    name: z.string(),
});

type Person = z.infer<typeof personSchema>;

export function getHello(person: unknown) {
    const validPerson = personSchema.parse(person);

    const name = getName(validPerson);

    return `Hello ${name}`;
}

function getName(person: Person): string {
    return person.name;
}
