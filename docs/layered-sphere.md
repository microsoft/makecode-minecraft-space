# Build a random layered sphere

Build a sphere to model a different celestial body with different colored layers.

```sig
    space.randomLayerSphere([LIGHT_BLUE_CONCRETE, GRASS, WHITE_CONCRETE], pos(0, 5, 0), 5, Axis.Y, true, ShapeOperation.Outline);
```

Spheres are constructed as slices of touching circles. A random layered sphere accepts a list of different blocks to use in the building process. In building the sphere, a different block is used per slice. If you want to see how a random layer sphere will look, build Earth or Jupiter!

## Parameters

* **blockList**: a list of block types that will be used to build the sphere slices

* **center**: the position of the center of the sphere that you are building. This is ~0 ~0 ~0 by default, to ensure that construction will start near the player. This might start construction below ground. If you start building a sphere and don't see it yet, try changing the middle 0 (up/down) to your sphere's radius value.

* **radius**: parameter that defines the size of the sphere

* **orientation**: the direction in which the slices will go. Regular spheres will build from left to right. By changing the axis, you can have the slices build bottom up or forward to back.

* **usBlockOrder**: if true, the sphere slices will be ordered of the block order in `blockList`. If false, each slice will be a random order of the blocks that you defined in `blockList`.

* **operator**: an operation defined by the `ShapeOperation` enum: Replace, Hollow, or Outline. The operator that the planets use are ShapeOperation.Outline.

```package

makecode-minecraft-space=github:microsoft/makecode-minecraft-space

```