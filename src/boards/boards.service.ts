import { Injectable } from '@nestjs/common';
import { BoardStatus, Board } from './boards.model'
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards : Board[] = []; // private를 쓰지 않으면 다른 컴포넌트에서 참조할 수 있으므로 
                                // 배열로 받을 것이므로 Board타입에 []를 넣어줘야한다.
    getAllBoards() : Board[]{
        return this.boards;
    }
    
    createBoard(createBoardDto: CreateBoardDto) : Board{
        const { title, description } = createBoardDto;
        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        return  this.boards.find((board) => board.id === id);
    }

    deleteBoard(id: string): void{
        this.boards = this. boards.filter((board) => board.id !== id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
