import React from "react";

type contextType = () => void
export let ForceUpdateContext = React.createContext<contextType>(() => {})