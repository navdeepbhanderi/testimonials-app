import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/providers/database/database.service';
import { CreateTestimonialDto } from './dto/testimonial.dto';

@Injectable()
export class TestimonialService {
    constructor(private databaseService: DatabaseService) { }

    async createTestomonial(createTestimonialPayload: CreateTestimonialDto) {
        const { notification_info, extra_info, ...testimonialData } = createTestimonialPayload;
       
        const testimonial = await this.databaseService.testimonial.create({
            data: {
                ...testimonialData,
                user_id: createTestimonialPayload.user_id,
            },
        });

        try {
            if (notification_info) {
                await this.databaseService.notification.create({
                    data: {
                        ...notification_info,
                        testimonial_id: testimonial.id,
                    },
                });
            }

            if (extra_info) {
                await this.databaseService.extraTestimonialInfo.create({
                    data: {
                        ...extra_info,
                        testimonial_id: testimonial.id,
                    },
                });
            }
        } catch (error) {
            console.log(error, 'error cc')

            return { success: false, message: error.error.message };
        }

        return { success: true, testimonialId: testimonial.id };
    }

    async updateTestomonial(createTestimonialPayload: CreateTestimonialDto, id: number) {
        const { notification_info, extra_info, ...testimonialData } = createTestimonialPayload;

        const testimonial = await this.databaseService.testimonial.update({
            data: {
                ...testimonialData
            },
            where: { id }
        })

        try {
            if (notification_info) {
                await this.databaseService.notification.update({
                    data: {
                        ...notification_info
                    },
                    where: {
                        testimonial_id: id
                    }
                })
            }

            if (extra_info) {
                await this.databaseService.extraTestimonialInfo.update({
                    data: {
                        ...extra_info
                    },
                    where: {
                        testimonial_id: id
                    }
                })
            }
        } catch (error) {
            return { success: false, message: error.error.message };
        }

        return { success: true, message: 'Testimonial Updated successfully', testimonialId: testimonial.id };
    }

    async deleteTestimonial(id: number) {
        try {
            await this.databaseService.testimonial.delete({ where: { id } });
            return { success: true, message: 'Testimonial Deleted successfully' };
        } catch (error) {
            console.log(error, 'error')
            return { success: false, message: error };
        }
    }

    async getTestimonialById(id: number) {
        const testimonial = await this.databaseService.testimonial.findUnique({ where: { id } });
        if (!testimonial) {
        throw new Error(`Testimonial with ID ${id} does not exist.`);
        }
        return testimonial;
    }

    async getExtraInfoByTestimonialId(id: number) {
        const extraInfo = await this.databaseService.extraTestimonialInfo.findUnique({ where: { testimonial_id: id } });
        if (!extraInfo) {
            throw new Error(`Extra info with ID ${id} does not exist.`);
        }
        return extraInfo;
    }

    async getNotificationInfoByTestimonialId(id: number) {
        const notificationInfo = await this.databaseService.notification.findUnique({ where: { testimonial_id: id } });
        if (!notificationInfo) {
            throw new Error(`Extra info with ID ${id} does not exist.`);
        }
        return notificationInfo;
    }

    async duplicateTestomonial(id: number) {
        try {
            const testimonial = await this.getTestimonialById(id);
            const extraInfo = await this.getExtraInfoByTestimonialId(testimonial.id);
            const notificationInfo = await this.getNotificationInfoByTestimonialId(testimonial.id);
            delete testimonial.id;
            delete extraInfo.id;
            delete notificationInfo.id;
            const newTestimonial = await this.createTestomonial({
                ...testimonial,
                extra_info: {
                    ...extraInfo
                },
                notification_info: {
                    ...notificationInfo
                }
            })
            console.log(newTestimonial, 'newTestimonial')
            return { success: true, message: 'Created duplicate testimonial.'};
        } catch (error) {
            console.log(error, 'error')
            return { success: false, message: error };
        }
    }
}
