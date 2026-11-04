export function snapToGrid(
    value: number,
    gridSize: number
): number {
    if (!Number.isFinite(value) ||
        !Number.isFinite(gridSize) ||
        gridSize <= 0) {
        return value;
    }

    return Math.round(value / gridSize) * gridSize;
}