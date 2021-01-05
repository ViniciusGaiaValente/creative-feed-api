import { Controller, Get, Param, Res, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('assets')

export class AssetsController {
  
  @Get('/:path')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Serve a uploaded file.' })
  @ApiTags('Assets')
  serveImage(@Param('path') path, @Res() res) {
    return res.sendFile(path, { root: 'assets' });
  }
}
