//% color=#0e0763 icon="\uf005"
namespace space {
    // Radius of planets
    // Radius in KMs divided by 1000
    // The larger planets were also further divided in half
    // Sun significantly reduced
    // Reductions made to make the solar system creation faster
    export enum Radius {
        Mercury = 2,
        Venus = 6,
        Earth = 6,
        Mars = 3,
        Jupiter = 35,
        Saturn = 29,
        Uranus = 13,
        Neptune = 12,
        Sun = 50,
    }

    //Distance from Sun in million kms divided by a million divided by 4
    // Distance for further planets adjusted to view better
    enum DistanceFromSun {
        Mercury = 14,
        Venus = 24,
        Earth = 41,
        Mars = 62,
        Jupiter = 97,
        Saturn = 185,
        Uranus = 358,
        Neptune = 562,
    }

    /**
     * Creates a solar system.
     * @param scale scale of radius of planets; eg: 1, 5; Multiplies the actual radius by (scale/3)
     */
    //% blockId=space_solarsystem block="solar system at center $center || of scale $scale"
    //% scale.min=1 scale.max=5 scale.defl=3
    //% center.shadow=minecraftCreatePosition
    //% group="Solar System"
    //% weight=30
    export function createSolarSystem(center: Position, scale?: number): void {
        center = center.toWorld();
        scale = scale / 3;
        const sunEdge = center.add(pos(Math.round(Radius.Sun * scale), Radius.Sun * scale, 0));
        const sunCenterRaised = center.add(pos(0, Radius.Sun * scale, 0));
        const mercuryCenter = sunEdge.add(
            pos(
                Math.round(
                    DistanceFromSun.Mercury * scale +
                        (2 * (Radius.Mercury * scale) + 2)
                ),
                0,
                0
            )
        );
        const venusCenter = sunEdge.add(
            pos(
                Math.round(
                    DistanceFromSun.Venus * scale +
                        (2 * (Radius.Venus * scale) + 2)
                ),
                0,
                0
            )
        );
        const earthCenter = sunEdge.add(
            pos(
                Math.round(
                    DistanceFromSun.Earth * scale +
                        (2 * (Radius.Earth * scale) + 2)
                ),
                0,
                0
            )
        );
        const marsCenter = sunEdge.add(
            pos(
                Math.round(
                    DistanceFromSun.Mars * scale +
                        (2 * (Radius.Mars * scale) + 2)
                ),
                0,
                0
            )
        );
        const jupiterCenter = sunEdge.add(
            pos(
                Math.round(
                    DistanceFromSun.Jupiter * scale +
                        (2 * (Radius.Jupiter * scale) + 2)
                ),
                0,
                0
            )
        );
        const saturnCenter = sunEdge.add(
            pos(
                Math.round(
                    DistanceFromSun.Saturn * scale +
                        (2 * (Radius.Saturn * scale) + 2 + 10)
                ),
                0,
                0
            )
        );
        const uranusCenter = sunEdge.add(
            pos(
                Math.round(
                    DistanceFromSun.Uranus * scale +
                        (2 * (Radius.Uranus * scale) + 2)
                ),
                0,
                0
            )
        );
        const neptuneCenter = sunEdge.add(
            pos(
                Math.round(
                    DistanceFromSun.Neptune * scale +
                        (2 * (Radius.Neptune * scale) + 2)
                ),
                0,
                0
            )
        );

        //Teleport player near the planet build area to fix the blocks getting missed out bug
        player.teleport(center.add(pos(0, 0, Radius.Sun + 5)));
        createSun(sunCenterRaised, Radius.Sun * scale);
        player.teleport(mercuryCenter.add(pos(0, 0, Radius.Mercury + 5)));
        createMercury(mercuryCenter, Radius.Mercury * scale);
        player.teleport(venusCenter.add(pos(0, 0, Radius.Venus + 5)));
        createVenus(venusCenter, Radius.Venus * scale);
        player.teleport(earthCenter.add(pos(0, 0, Radius.Earth + 5)));
        createEarth(earthCenter, Radius.Earth * scale);
        player.teleport(marsCenter.add(pos(0, 0, Radius.Mars + 5)));
        createMars(marsCenter, Radius.Mars * scale);
        player.teleport(jupiterCenter.add(pos(0, 0, Radius.Jupiter + 5)));
        createJupiter(jupiterCenter, Radius.Jupiter * scale);
        player.teleport(saturnCenter.add(pos(0, 0, Radius.Saturn + 5)));
        createSaturn(saturnCenter, Radius.Saturn * scale);
        player.teleport(uranusCenter.add(pos(0, 0, Radius.Uranus + 5)));
        createUranus(uranusCenter, Radius.Uranus * scale);
        player.teleport(neptuneCenter.add(pos(0, 0, Radius.Neptune + 5)));
        createNeptune(neptuneCenter, Radius.Neptune * scale);
    }

    //% blockId=space_planet_mercury block="mercury at center $center || of radius $radius"
    //% group="Planets"
    //% center.shadow=minecraftCreatePosition
    //% radius.defl=2
    //% weight=99
    export function createMercury(
        center: Position,
        radius?: number
    ): void {
        if (radius <= 0) return;
        space.sphere(
            LIGHT_GRAY_CONCRETE,
            center.add(pos(0, radius, 0)),
            radius,
            ShapeOperation.Outline
        );
    }

    //% blockId=space_planet_venus block="venus at center $center || of radius $radius"
    //% group="Planets"
    //% center.shadow=minecraftCreatePosition
    //% radius.defl=6
    //% weight=98
    export function createVenus(
        center: Position,
        radius?: number
    ): void {
        if (radius <= 0) return;
        space.sphere(YELLOW_CONCRETE, center.add(pos(0, radius, 0)), radius, ShapeOperation.Outline);
    }

    //% blockId=space_planet_earth block="earth at center $center || of radius $radius"
    //% group="Planets"
    //% center.shadow=minecraftCreatePosition
    //% radius.defl=6
    //% weight=97
    export function createEarth(
        center: Position,
        radius?: number
    ): void {
        if (radius <= 0) return;
        space.randomLayerSphere(
            [LIGHT_BLUE_CONCRETE, GRASS, WHITE_CONCRETE],
            center.add(pos(0, radius, 0)),
            radius,
            Axis.Y,
            true,
            ShapeOperation.Outline
        );
    }

    //% blockId=space_planet_mars block="mars at center $center || of radius $radius"
    //% group="Planets"
    //% center.shadow=minecraftCreatePosition
    //% radius.defl=3
    //% weight=96
    export function createMars(
        center: Position,
        radius?: number
    ): void {
        if (radius <= 0) return;
        space.sphere(RED_SANDSTONE, center.add(pos(0, radius, 0)), radius, ShapeOperation.Outline);
    }

    //% blockId=space_planet_jupiter block="jupiter at center $center || of radius $radius"
    //% group="Planets"
    //% center.shadow=minecraftCreatePosition
    //% radius.defl=35
    //% weight=95
    export function createJupiter(
        center: Position,
        radius?: number
    ): void {
        if (radius <= 0) return;
        space.randomLayerSphere(
            [ORANGE_CONCRETE, WHITE_CONCRETE],
            center.add(pos(0, radius, 0)),
            radius,
            Axis.Y,
            true,
            ShapeOperation.Outline
        );
    }

    //% blockId=space_planet_saturn block="saturn at center $center || of radius $radius"
    //% group="Planets"
    //% center.shadow=minecraftCreatePosition
    //% radius.defl=29
    //% weight=94
    export function createSaturn(
        center: Position,
        radius?: number
    ): void {
        const ringNum = 7;
        if (radius <= 0) return;
        center = center.toWorld();
        space.sphere(GOLD_BLOCK, center.add(pos(0, radius, 0)), radius, ShapeOperation.Outline);
        for (let i = 0; i < ringNum; i++) {
            shapes.circle(
                GOLD_BLOCK,
                center.add(pos(0, radius, 0)),
                radius + 3 + i * 2,
                Axis.Y,
                ShapeOperation.Outline
            );
        }

    }

    //% blockId=space_planet_uranus block="uranus at center $center || of radius $radius"
    //% group="Planets"
    //% center.shadow=minecraftCreatePosition
    //% radius.defl=13
    //% weight=93
    export function createUranus(
        center: Position,
        radius?: number
    ): void {
        if (radius <= 0) return;
        space.sphere(
            LIGHT_BLUE_CONCRETE,
            center.add(pos(0, radius, 0)),
            radius,
            ShapeOperation.Outline
        );
    }

    //% blockId=space_planet_neptune block="neptune at center $center || of radius $radius"
    //% group="Planets"
    //% center.shadow=minecraftCreatePosition
    //% radius.defl=12
    //% weight=92
    export function createNeptune(
        center: Position,
        radius?: number
    ): void {
        if (radius <= 0) return;
        space.sphere(BLUE_CONCRETE, center.add(pos(0, radius, 0)), radius, ShapeOperation.Outline);
    }

    //% blockId=space_stars_sun block="sun at center $center || of radius $radius"
    //% radius.defl=50
    //% center.shadow=minecraftCreatePosition
    //% group="Stars"
    export function createSun(
        center: Position,
        radius?: number
    ): void {
        if (radius <= 0) return;
        space.sphere(GLOWSTONE, center.add(pos(0, radius, 0)), radius, ShapeOperation.Outline);
    }
}
