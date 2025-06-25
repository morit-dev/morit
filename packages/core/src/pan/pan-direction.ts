export const PAN_DIRECTION_UNKNOWN = 0;
export const PAN_DIRECTION_UP = 1;
export const PAN_DIRECTION_RIGHT = 2;
export const PAN_DIRECTION_DOWN = 3;
export const PAN_DIRECTION_LEFT = 4;

export type PanDirection =
  | typeof PAN_DIRECTION_UNKNOWN
  | typeof PAN_DIRECTION_UP
  | typeof PAN_DIRECTION_RIGHT
  | typeof PAN_DIRECTION_DOWN
  | typeof PAN_DIRECTION_LEFT;

export const isPanDirectionVertical = (direction: PanDirection) =>
  direction === PAN_DIRECTION_UP || direction === PAN_DIRECTION_DOWN;
export const isPanDirectionHorizontal = (direction: PanDirection) =>
  direction === PAN_DIRECTION_LEFT || direction === PAN_DIRECTION_RIGHT;

export const getPanDirection = (deltaX: number, deltaY: number) => {
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);

  if (absDeltaX > absDeltaY) {
    if (deltaX > 0) return PAN_DIRECTION_RIGHT;
    if (deltaX < 0) return PAN_DIRECTION_LEFT;
  } else {
    if (deltaY > 0) return PAN_DIRECTION_UP;
    if (deltaY < 0) return PAN_DIRECTION_DOWN;
  }

  return PAN_DIRECTION_UNKNOWN;
};
