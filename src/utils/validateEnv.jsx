import { cleanEnv, str } from "envalid";

export default cleanEnv(process.env, {
    REACT_APP_WITHDRAW_CONTRACT: str(),
    REACT_APP_ETHX_CONTRACT: str(),
    REACT_APP_STAKING_CONTRACT: str(),
});