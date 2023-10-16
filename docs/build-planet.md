# Build a Planet from the Solar System

 Build a replica of any of the 8 planets that are part of the solar system. 

```sig
space.createEarth(pos(0, 0, 0))
```
```sig
space.createEarth(pos(0, 0, 0), 6)
``````

```sig
space.createSaturn(pos(0, 0, 0))
```
```sig
space.createSaturn(pos(0, 0, 0), 29)
```

## Parameters


* **center**: the position of the center of the planet that you are building. This is ~0 ~0 ~0 by default, to ensure that construction will start near the player. There are some internal offsets that happen so the planets are above ground. The planets will start building the radius' distance away from the player so the center is truly ~0 ~0 ~0.

* **radius**: optional parameter that defines the size of the planet. The default value for each planet was found by scaling their actual radius down.

```package

makecode-minecraft-space=github:microsoft/makecode-minecraft-space

```