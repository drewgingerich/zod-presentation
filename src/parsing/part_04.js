class Person {
    constructor(person) {
        if (typeof person !== "object") {
            throw Error('"person" is not an object');
        }

        if (!person.hasOwnProperty("name")) {
            throw Error('"person" does not have property "name"');
        }

        if (typeof person.name !== "string") {
            throw Error('"person.name" is not a string');
        }

        this.name = person.name;
    }
}

export function getHello(person) {
    const validPerson = new Person(person);

    const name = getName(validPerson);

    return `Hello ${name}`;
}

function getName(person) {
    return person.name;
}
