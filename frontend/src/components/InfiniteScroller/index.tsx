import React, { forwardRef, MutableRefObject, useRef } from "react";

interface Props {
    hasMore: boolean;
    loading: boolean;
    loader?: JSX.Element | null;
    className?: string;
    ref?: MutableRefObject<HTMLDivElement | null> | ((instance: HTMLDivElement | null) => void) | null;
    loadMore: () => void;
}

const InfiniteScroller: React.FC<Props> = forwardRef<HTMLDivElement | null, Props>(
    ({ hasMore, loading, className, loader = null, children, loadMore }, extRef) => {
        const ref = useRef<HTMLDivElement | null>(null);

        const onScroll = () => {
            const element = ref.current;

            if (!element || !hasMore || loading) {
                return;
            }

            const beforeBottom = element.scrollHeight - element.scrollTop - element.clientHeight;

            if (beforeBottom < 10) {
                loadMore();
            }
        };

        onScroll();

        return (
            <div
                className={className}
                onScroll={onScroll}
                ref={(element) => {
                    ref.current = element;

                    if (extRef) {
                        if (typeof extRef === "function") {
                            extRef(element);
                        } else {
                            extRef.current = element;
                        }
                    }
                }}
            >
                {children}
                {loading ? loader : null}
            </div>
        );
    },
);

export default InfiniteScroller;
