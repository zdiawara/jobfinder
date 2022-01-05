import { IonText } from "@ionic/react";
import { FC } from "react";

import "./TextEllipsis.scss";

type TextEllipsisProps = {
  className?: string;
};

const TextEllipsis: FC<TextEllipsisProps> = ({ className, children }) => {
  return <IonText className={`text-ellipsis ${className}`}>{children}</IonText>;
};

TextEllipsis.defaultProps = {
  className: "",
};

export default TextEllipsis;
