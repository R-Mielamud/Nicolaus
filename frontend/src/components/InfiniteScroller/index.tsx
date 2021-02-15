import React from "react";

interface Props {
    hasMore: boolean;
    loading: boolean;
    loader?: JSX.Element | null;
    className?: string;
    loadMore: () => void;
}

// I need ref here
class InfiniteScroller extends React.Component<Props> {
    protected ref: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);
        this.ref = React.createRef<HTMLDivElement>();
    }

    onScroll = () => {
        const { hasMore, loading, loadMore } = this.props;
        const element = this.ref.current;

        if (!element || !hasMore || loading) {
            return;
        }

        const beforeBottom = element.scrollHeight - element.scrollTop - element.clientHeight;

        if (beforeBottom < 10) {
            loadMore();
        }
    };

    componentDidMount = () => {
        this.onScroll();
    };

    render(): JSX.Element {
        const { className, loading, loader = null, children } = this.props;

        return (
            <div className={className} onScroll={this.onScroll} ref={this.ref}>
                {children}
                {loading ? loader : null}
            </div>
        );
    }
}

export default InfiniteScroller;
