# Build the Solar System

Build the sun and all of the planets in the sky! 

```sig
space.createSolarSystem(pos(0, 0, 0))
```

```sig
space.createSolarSystem(pos(0, 0, 0), 3)
```

This block uses spheres from the `shapes` category and custom spheres as part of this extension to build the planets and sun.

## Parameters


* **center**: the position of the center of the whole solar system. This is ~0 ~0 ~0 by default, to ensure that construction will start near the player. There are some internal offsets that happen so the planets and sun are above ground and so the center of the solar system truly is at where the player was at the start of the block running.

* **scale**: optional parameter that defines how large or small the solar system will be. This will impact the size of each celestial body.

```package

makecode-minecraft-space=github:microsoft/makecode-minecraft-space

```