namespace space {
    /**
     * Fill a sphere of blocks at a center position.
     * This is basically the shapes' sphere function with small adjustments 
     * to how the blocks are placed.
     * @param radius the radius of the sphere, eg: 5
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
                        builder.teleportTo(p);
                        builder.place(block);
                    } else if (operator == ShapeOperation.Hollow) {
                        builder.teleportTo(p);
                        builder.place(Block.Air);
                    }
                }
            }
        }
    }

    /**
     * Fill a sphere of blocks chosen at random from the block list provided, at a center position.
     * @param radius the radius of the sphere, eg: 5
     */
    //% blockId=space_sphereRandomBlocks
    //% block="sphere of random blocks from $blockList|center $center=minecraftCreatePosition|radius $radius|$operator"
    //% blockList.shadow="lists_create_with"
    //% blockList.defl="minecraftBlock"
    //% blockExternalInputs=1
    //% help=shapes/sphere
    //% group="Shapes"
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
                        builder.teleportTo(p);
                        builder.place(blockList._pickRandom());
                    } else if (operator == ShapeOperation.Hollow) {
                        builder.teleportTo(p);
                        builder.place(Block.Air);
                    }
                }
            }
        }
    }

    /**
     * Fill a sphere of blocks where block for each layer is chosen at random or in order from the block list provided, at a center position.
     * @param radius the radius of the sphere, eg: 5
     */
    //% blockId=space_sphereRandomLayerBlocks
    //% block="sphere of random layers from $blockList|center $center=minecraftCreatePosition|radius $radius|around $orientation|in order of blocks $useBlockOrder|$operator"
    //% blockList.shadow="lists_create_with"
    //% blockList.defl="minecraftBlock"
    //% useBlockOrder.defl=false
    //% blockExternalInputs=1
    //% help=shapes/sphere
    //% group="Shapes"
    export function randomLayerSphere(
        blockList: number[],
        center: Position,
        radius: number,
        orientation: Axis,
        useBlockOrder: boolean,
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
            if (useBlockOrder) {
                blockForCurrentLayer =
                    blockList[Math.abs(x) % blockList.length];
            } else {
                blockForCurrentLayer = blockList._pickRandom();
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
                        builder.teleportTo(p);
                        builder.place(blockForCurrentLayer);
                    } else if (operator == ShapeOperation.Hollow) {
                        builder.teleportTo(p);
                        builder.place(Block.Air);
                    }
                }
            }
        }
    }
}
