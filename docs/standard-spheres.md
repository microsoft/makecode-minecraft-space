# Build a standard sphere

Build a sphere to model a different celestial body.

```sig
    space.sphere(GOLD_BLOCK, pos(0, 10, 0), 10, ShapeOperation.Outline);

```
```sig
space.randomSphere([LIGHT_BLUE_CONCRETE, GRASS, WHITE_CONCRETE], pos(0, 5, 0), 5, ShapeOperation.Outline)
```

## Parameters

* **block**: the block used when building the sphere

* **center**: the position of the center of the sphere that you are building. This is ~0 ~0 ~0 by default, to ensure that construction will start near the player. This might start construction below ground. If you start building a sphere and don't see it yet, try changing the middle 0 (up/down) to your sphere's radius value.

* **radius**: parameter that defines the size of the sphere

* **operator**: an operation defined by the `ShapeOperation` enum: Replace, Hollow, or Outline. The operator that the planets use are ShapeOperation.Outline.

```package

makecode-minecraft-space=github:microsoft/makecode-minecraft-space

```