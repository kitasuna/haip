import { get } from "../lib/index"

const o = {
    a: 331,
    b: false,
    c: {
      c0: 128,
      c1: false
    },
    d: "haip",
    e: [1,2,3]
}

const getter = get(o)

test("should get a boolean when it exists", () => {
  const result = getter("b")(true)
  expect(result).toBe(false)
})

test("should get a number when it exists", () => {
  const result = getter("a")(42)
  expect(result).toBe(331)
})

test("should get an array when it exists", () => {
  const result = getter("e")([4,5,6])
  expect(result).toEqual([1,2,3])
})

test("should get an object when it exists", () => {
  const result = getter("c")({})
  expect(result).toEqual({c0: 128, c1: false})
})

test("should get a string when it exists", () => {
  const result = getter("d")("hype")
  expect(result).toBe('haip')
})

test("should use the default boolean when the key does not exist", () => {
  const result = getter("badkey")(true)
  expect(result).toBe(true)
})

test("should use the default number when the key does not exist", () => {
  const result = getter("badkey")(128)
  expect(result).toBe(128)
})

test("should use the default string when the key does not exist", () => {
  const result = getter("badkey")("oops")
  expect(result).toBe("oops")
})

test("should use the default array when the key does not exist", () => {
  const result = getter("badkey")([1,2,3])
  expect(result).toEqual([1,2,3])
})

test("should use the default object when the key does not exist", () => {
  const result = getter("badkey")({meaning: 42})
  expect(result).toEqual({meaning: 42})
})

test("should use the default boolean when the key exists but the types do not match", () => {
  const result = getter("a")(true)
  expect(result).toBe(true)
})

test("should use the default number when the key exists but the types do not match", () => {
  const result = getter("b")(42)
  expect(result).toBe(42)
})

test("should use the default string when the key exists but the types do not match", () => {
  const result = getter("a")("hey there")
  expect(result).toBe("hey there")
})

test("should use the default array when the key exists but the types do not match", () => {
  const result = getter("a")([1,2,3])
  expect(result).toEqual([1,2,3])
})

test("should use the default object when the key exists but the types do not match", () => {
  const result = getter("a")({meaning: 42})
  expect(result).toEqual({meaning: 42})
})
