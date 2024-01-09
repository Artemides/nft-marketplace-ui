type Role = "Client" | "Admin" | "Seller";
type Person = {
  name: string;
  age?: number;
  role: Role;
};

function Proxies() {
  const person: Person = {
    name: "Christian",
    age: 25,
    role: "Admin",
  };
  const handler: ProxyHandler<Person> = {
    get(target, prop: keyof Person, value: Role) {
      if (prop === "role" && value === "Admin") {
      }
    },
    deleteProperty(person, p: keyof Person) {
      if (p === "role" || p === "name") {
        console.log(`cannot remove ${p} prop`);
        return false;
      }
      if (!(p in person)) return false;

      delete person[p];
      return true;
    },
  };
  const proxyPerson = new Proxy(person, handler);

  delete proxyPerson["age"];
}
