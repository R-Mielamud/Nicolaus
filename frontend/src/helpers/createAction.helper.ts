import { AnyAction } from "redux";

interface IEmptyActionFn {
    (): AnyAction;
}

interface IActionFn<TArgs> {
    (args: TArgs): AnyAction & TArgs;
}

export default function createAction(type: string): IEmptyActionFn;
export default function createAction<TArgs>(type: string): IActionFn<TArgs>;
export default function createAction<TArgs>(type: string): IEmptyActionFn | IActionFn<TArgs> {
    return (args?: TArgs): AnyAction & TArgs => {
        return Object.assign({ type }, args);
    };
}
