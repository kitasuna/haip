# Haip
Haip (pronounced "hype") is just one lonely TypeScript function that allows type-safe `get` operations on JavaScript objects. It works by asking you to provide a default value for the operation, and it uses the type of your default to check if the property both exists and matches the type you're looking for.

So there are a few possible scenarios:

* The property does not exist -> return the default value
* The property does exist but the type is different than that of the default -> return the default value
* The property does exist and the type matches that of the default value -> return the value of the specified prop from the object, then do a little celebratory dance.

Haip is curried and is designed to bring some sort of type safety to code where you're getting data from external sources, because that data may or may not match your delicate little type definitions.

# Usage

## Typescript
```
import { get } from "haip"

const o = {
    a: 331,
    b: false,
}

// Oh hey currying sweet
const getter = get(o)

const res0 = getter("a")(123)
// Prop `a` exists, type matches, so the actual value is returned
// res0 = 331

const res1 = getter("b")(123)
// Prop exists, type doesn't match, so default is returned
// res1 = 123

const res2 = getter("c")("oh hai")
// Prop doesn't exist, so default is returned
// res2 = "oh hai"
```

## Javascipt

You obviously don't get typechecking this way, but hey, maybe you're just a super chill person. I'm not one to judge.

```
const haip = require("haip")

const o = {
    a: 331,
    b: false,
}

// Currying still works! Arguably better ;)
const getter = haip.get(o)

const res0 = getter("a")(123)
// Prop `a` exists, type matches, so the actual value is returned
// res0 = 331

const res1 = getter("b")(123)
// Prop exists, type doesn't match, so default is returned
// res1 = 123

const res2 = getter("c")("oh hai")
// Prop doesn't exist, so default is returned
// res2 = "oh hai"
```

# API

## get :: <T>(obj: T) => (k: string) => \<S\>(def: S): S

### obj
This is the object you'd like to pull stuff out of

### k
The key of the property you're interested in

### def
A default value. The type here (in our case, the geneneric `S`) is also the return type of the function.


# Types
The current implementation uses the [built-in `typeof` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof), so base your expectations on the output there. The one exception to this is `Array`s, which are checked for using the `Array.isArray` function.
