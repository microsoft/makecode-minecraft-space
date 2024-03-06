namespace space {
    const _spaceBuilder = new builder.Builder();

    /**
     * Fill a sphere of blocks at a center position.
     * This is basically the shapes' sphere function with small adjustments 
     * to how the blocks are placed.
     * @param blockList list of block types that builds the sphere
     * @param center the position where the center of the sphere will be
     * @param radius the radius of the sphere, eg: 5
     * @param operator how each slice of the sphere will be built: Hollow, Replace, or Outline
     */
    export function sphere(
        block: number,
        center: Position,
        radius: number,
        operator: ShapeOperation
    ) {
        if (radius <= 0) return;

        radius = Math.round(radius);

        center = center.toWorld();
        const xc = Math.round(center.getValue(Axis.X));
        const yc = Math.round(center.getValue(Axis.Y));
        const zc = Math.round(center.getValue(Axis.Z));
        const radius2 = radius * radius;
        const radiuso = (radius - 1) * (radius - 1);
        for (let x = -radius; x <= radius; ++x) {
            const x2 = x * x;
            for (let y = -radius; y <= radius; ++y) {
                const y2 = y * y;
                if (x2 + y2 > radius2) continue;

                for (let z = -radius; z <= radius; ++z) {
                    const z2 = z * z;
                    if (x2 + y2 + z2 > radius2) continue;
                    const p = positions.createWorld(xc + x, yc + y, zc + z);

                    if (
                        operator == ShapeOperation.Replace ||
                        x2 + y2 + z2 >= radiuso
                    ) {
                        // on the "crust"
                        _spaceBuilder.teleportTo(p);
                        _spaceBuilder.place(block);
                    } else if (operator == ShapeOperation.Hollow) {
                        _spaceBuilder.teleportTo(p);
                        _spaceBuilder.place(Block.Air);
                    }
                }
            }
        }
    }

    /**
     * Fill a sphere of blocks chosen at random from the block list provided, at a center position.
     * @param blockList list of block types that builds the sphere
     * @param center the position where the center of the sphere will be
     * @param radius the radius of the sphere, eg: 5
     * @param operator how each slice of the sphere will be built: Hollow, Replace, or Outline
    */
    //% blockId=space_sphereRandomBlocks
    //% block="sphere of random blocks from $blockList|center $center|radius $radius|$operator"
    //% center.shadow=minecraftCreatePosition
    //% blockList.shadow="lists_create_with"
    //% blockList.defl="minecraftBlock"
    //% blockExternalInputs=1
    //% help=shapes/sphere
    //% group="Shapes"
    //% help=github:makecode-minecraft-space/docs/standard-spheres
    export function randomSphere(
        blockList: number[],
        center: Position,
        radius: number,
        operator: ShapeOperation
    ) {
        if (radius <= 0) return;

        radius = Math.round(radius);

        center = center.toWorld();
        const xc = Math.round(center.getValue(Axis.X));
        const yc = Math.round(center.getValue(Axis.Y));
        const zc = Math.round(center.getValue(Axis.Z));
        const radius2 = radius * radius;
        const radiuso = (radius - 1) * (radius - 1);
        for (let x = -radius; x <= radius; ++x) {
            const x2 = x * x;
            for (let y = -radius; y <= radius; ++y) {
                const y2 = y * y;
                if (x2 + y2 > radius2) continue;

                for (let z = -radius; z <= radius; ++z) {
                    const z2 = z * z;
                    if (x2 + y2 + z2 > radius2) continue;
                    const p = positions.createWorld(xc + x, yc + y, zc + z);

                    if (
                        operator == ShapeOperation.Replace ||
                        x2 + y2 + z2 >= radiuso
                    ) {
                        // on the "crust"
                        _spaceBuilder.teleportTo(p);
                        _spaceBuilder.place(blockList._pickRandom());
                    } else if (operator == ShapeOperation.Hollow) {
                        _spaceBuilder.teleportTo(p);
                        _spaceBuilder.place(Block.Air);
                    }
                }
            }
        }
    }

    /**
     * Fill a sphere of blocks where block for each layer is chosen at random or in order from the block list provided, at a center position.
     * @param blockList list of block types that builds the sphere
     * @param center the position where the center of the sphere will be
     * @param radius the radius of the sphere, eg: 5
     * @param orientation the axis on which the sphere will build: either X, Y, or Z
     * @param useRandomOrder each slice of the sphere will use random of the blocklist if true or the order if false
     */
    //% blockId=space_sphereCustomLayerBlocks
    //% block="sphere of custom layers from $blockList|center $center|radius $radius|around $orientation|in random order $useRandomOrder|$operator"
    //% center.shadow=minecraftCreatePosition
    //% blockList.shadow="lists_create_with"
    //% blockList.defl="minecraftBlock"
    //% useRandomOrder.defl=false
    //% blockExternalInputs=1
    //% help=shapes/sphere
    //% group="Shapes"
    //% help=github:makecode-minecraft-space/docs/layered-sphere
    export function customLayerSphere(
        blockList: number[],
        center: Position,
        radius: number,
        orientation: Axis,
        useRandomOrder: boolean,
        operator: ShapeOperation
    ) {
        if (radius <= 0) return;

        radius = Math.round(radius);

        center = center.toWorld();
        const xc = Math.round(center.getValue(Axis.X));
        const yc = Math.round(center.getValue(Axis.Y));
        const zc = Math.round(center.getValue(Axis.Z));
        const radius2 = radius * radius;
        const radiuso = (radius - 1) * (radius - 1);

        for (let x = -radius; x <= radius; ++x) {
            let blockForCurrentLayer: Block;
            if (useRandomOrder) {
                blockForCurrentLayer = blockList._pickRandom();
            } else {
                blockForCurrentLayer = blockList[Math.abs(x) % blockList.length];
            }
            const x2 = x * x;
            for (let y = -radius; y <= radius; ++y) {
                const y2 = y * y;
                if (x2 + y2 > radius2) continue;
                for (let z = -radius; z <= radius; ++z) {
                    const z2 = z * z;
                    if (x2 + y2 + z2 > radius2) continue;
                    let p: Position;
                    if (orientation == Axis.Y) {
                        p = positions.createWorld(xc + y, yc + x, zc + z);
                    } else if (orientation == Axis.Z) {
                        p = positions.createWorld(xc + z, yc + y, zc + x);
                    } else {
                        p = positions.createWorld(xc + x, yc + y, zc + z);
                    }

                    if (
                        operator == ShapeOperation.Replace ||
                        x2 + y2 + z2 >= radiuso
                    ) {
                        // on the "crust"
                        _spaceBuilder.teleportTo(p);
                        _spaceBuilder.place(blockForCurrentLayer);
                    } else if (operator == ShapeOperation.Hollow) {
                        _spaceBuilder.teleportTo(p);
                        _spaceBuilder.place(Block.Air);
                    }
                }
            }
        }
    }
}
