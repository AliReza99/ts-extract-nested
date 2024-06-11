# TypeScript Deep Extract Utility

This project demonstrates a custom utility type for extracting nested types in TypeScript, specifically for handling complex nested structures with arrays.

## Overview

The utility type `DeepExtract` is designed to perform nested extraction on complex TypeScript types. It helps in filtering and extracting specific nested structures, ensuring that only the desired types are included.

## Types

### Features

The `Features` type can either be a text feature or a number feature:

```typescript
type Features =
  | {
      type: "text";
      length: number;
    }
  | {
      type: "number";
      min: number;
    };
```

### Root

The `Root` type includes a name and an array of feature objects, each containing a name and an array of subfeatures:

```typescript
type Root = {
  name: string;
  features: {
    name: string;
    subFeature: Features[];
  }[];
};
```

## Utility Types

### ExtractArray

The `ExtractArray` type is a helper type for extracting and filtering elements within an array:

```typescript
type ExtractArray<T, U> = T extends (infer R)[] ? Extract<R, U>[] : never;
```

### DeepExtract

The `DeepExtract` type recursively traverses the structure, applying extraction logic to handle arrays and nested objects:

```typescript
type DeepExtract<T, U> = T extends object
  ? {
      [K in keyof T]: K extends keyof U
        ? T[K] extends (infer R)[]
          ? ExtractArray<T[K], U[K]>
          : DeepExtract<T[K], U[K]>
        : T[K];
    }
  : T;
```

## Example

The following example demonstrates how to use `DeepExtract` to extract nested `subFeature` elements with `type: 'text'`:

```typescript
type RootWithTextFeatures = DeepExtract<
  Root,
  { features: { subFeature: { type: "text" } } }
>;

const rootWithTextFeatures: RootWithTextFeatures = {
  name: "Example",
  features: [
    {
      name: "Feature1",
      subFeature: [
        {
          type: "text",
          length: 100,
        },
      ],
    },
  ],
};
```

## Usage

To use these utility types in your project:

1. Define the `Features` and `Root` types as shown above.
2. Implement the `ExtractArray` and `DeepExtract` utility types.
3. Use the `DeepExtract` type to create filtered versions of your types as needed.
