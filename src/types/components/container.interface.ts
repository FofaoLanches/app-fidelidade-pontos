import { ComponentProps } from "react";

import { SomeChildInterface } from "..";

type SectionProps = ComponentProps<"section">;
type CutSectionProps = Pick<SectionProps, "className">;

export interface ContainerInterface extends CutSectionProps, SomeChildInterface {}
