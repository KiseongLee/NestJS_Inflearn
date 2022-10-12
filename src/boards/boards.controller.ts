import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private BoardsService: BoardsService){}

    @Get('/')
    getAllBoards(): Board[]{
        return this.BoardsService.getAllBoards();
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Board{

        return this.BoardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board{
        return this.BoardsService.getBoardById(id);
    }

    @Get('/:id')
    deleteBoard(@Param('id') id: string): void{ // 삭제할 때는 리턴값을 주지 않아도됨. 알아서 필터되는 듯하다.
        this.BoardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoard(
        @Param('id') id: string,
        @Body('status') status: BoardStatus
    ) {
        return this.BoardsService.updateBoardStatus(id, status);
    }
}   
