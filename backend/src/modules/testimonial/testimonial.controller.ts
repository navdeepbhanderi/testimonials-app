import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { Prisma } from '@prisma/client';
import { CreateTestimonialDto } from './dto/testimonial.dto';

@Controller('testimonial')
export class TestimonialController {
    constructor(private testimonialService: TestimonialService){}


    @Post('create')
    @UseGuards(JwtAuthGuard)
    async createTestimonial (@Body() createTestimonialPayload: CreateTestimonialDto) {
        return await this.testimonialService.createTestomonial(createTestimonialPayload);
    }

    @Post('update/:id')
    @UseGuards(JwtAuthGuard)
    async updateTestimonial (@Body() createTestimonialPayload: CreateTestimonialDto, @Param('id', ParseIntPipe) id: number) {
        return await this.testimonialService.updateTestomonial(createTestimonialPayload, id);
    }


    @Post('duplicate/:id')
    @UseGuards(JwtAuthGuard)
    async duplicateTestimonial (@Param('id', ParseIntPipe) id: number) {
        return await this.testimonialService.duplicateTestomonial(id);
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard)
    async deleteTestimonial (@Param('id', ParseIntPipe) id: number) {
        return await this.testimonialService.deleteTestimonial(id);
    }
}
