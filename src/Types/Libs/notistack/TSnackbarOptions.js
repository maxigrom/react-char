// @flow
import type { TSnackbarOptionsVariant } from './TSnackbarOptionsVariant';

export type TSnackbarOptions = {
  variant: ?TSnackbarOptionsVariant,
  onClickAction: () => void,
};
