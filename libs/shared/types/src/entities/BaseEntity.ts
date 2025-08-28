export default class BaseEntity {
    protected props: any;

    constructor(props: any) {
        this.props = props;
    }

    toJSON(): any {
        return this.props;
    }
}