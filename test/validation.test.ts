import { createEventSchema, updateEventSchema } from '../src/api/v1/validation/eventValidation';
import Joi from 'joi';

// Helper function to generate a future date
const getFutureDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1); // Set date to tomorrow
    return date.toISOString();
};

describe('Event Validation Schemas', () => {
    // Test suite for createEventSchema
    describe('createEventSchema', () => {
        // Test for a valid event object
        it('should validate a correct event object', () => {
            const correctEvent = {
                name: 'Tech Conference 2027',
                date: getFutureDate(),
                capacity: 150,
                registrationCount: 50,
                status: 'active',
                category: 'conference',
            };

            const { error } = createEventSchema.validate(correctEvent);
            expect(error).toBeUndefined();
        });

        // Test for missing 'name' field
        it('should return an error if name is missing', () => {
            const eventWithoutName = {
                date: getFutureDate(),
                capacity: 150,
            };

            const { error } = createEventSchema.validate(eventWithoutName);
            expect(error).toBeInstanceOf(Joi.ValidationError);
            if (error) {
                expect(error.details[0].message).toBe('"name" is required');
            }
        });

        // Test for invalid 'date' format
        it('should return an error for an invalid date format', () => {
            const eventWithInvalidDate = {
                name: 'Invalid Date Event',
                date: '15-10-2027', // Invalid format
                capacity: 100,
            };

            const { error } = createEventSchema.validate(eventWithInvalidDate);
            expect(error).toBeInstanceOf(Joi.ValidationError);
        });

        // Test for 'capacity' less than the minimum
        it('should return an error if capacity is less than 5', () => {
            const eventWithLowCapacity = {
                name: 'Small Group Meeting',
                date: getFutureDate(),
                capacity: 4, // Below the minimum
            };

            const { error } = createEventSchema.validate(eventWithLowCapacity);
            expect(error).toBeInstanceOf(Joi.ValidationError);
            if (error) {
                expect(error.details[0].message).toBe('"capacity" must be greater than or equal to 5');
            }
        });
    });

    // Test suite for updateEventSchema
    describe('updateEventSchema', () => {
        // Test for a valid partial update
        it('should validate a correct partial update object', () => {
            const partialUpdate = {
                name: 'Updated Tech Conference',
                capacity: 200,
            };

            const { error } = updateEventSchema.validate(partialUpdate);
            expect(error).toBeUndefined();
        });

        // Test for invalid 'status'
        it('should return an error for an invalid status', () => {
            const updateWithInvalidStatus = {
                status: 'pending', // Not a valid status
            };

            const { error } = updateEventSchema.validate(updateWithInvalidStatus);
            expect(error).toBeInstanceOf(Joi.ValidationError);
            if (error) {
                expect(error.details[0].message).toBe('"status" must be one of [active, cancelled, completed]');
            }
        });

        // Test for 'registrationCount' exceeding 'capacity'
        it('should return an error if registrationCount exceeds capacity', () => {
            const invalidRegistration = {
                capacity: 50,
                registrationCount: 51, // Exceeds capacity
            };

            const { error } = updateEventSchema.validate(invalidRegistration);
            expect(error).toBeInstanceOf(Joi.ValidationError);
        });
    });
});
