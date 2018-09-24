import IMemoryStorageProps from "kanban/view/memoryStorage/IMemoryStorageProps";
import Card from "kanban/model/Card";

interface ICardViewProps extends IMemoryStorageProps {
    card: Card;
    index: number;
    listId: string;
}

export default ICardViewProps;