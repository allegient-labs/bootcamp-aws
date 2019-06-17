const { Pet, createResponse, dynamo } = require('@dmi-bootcamp/pet-layer');

const tableName = process.env.TABLE_NAME;

exports.lambdaHandler = async (event) => {
    try {
        const bodyJson = JSON.parse(event.body);
        const existingData = await dynamo.get({
            TableName: tableName,
            Key: {
                id: event.pathParameters.petId
            }
        }).promise();

        if (!existingData.Item) {
            return createResponse(404, { message: 'Pet not found', response: existingData });
        }

        const pet = Pet.fromDbJson({
            ...existingData.Item,
            ...bodyJson,
            id: existingData.Item.id,
        });

        await dynamo.update({
            TableName: tableName,
            Key: { id: existingData.Item.id },
            ReturnValues: 'ALL_NEW',
            ...pet.toUpdateExpressions()
        }).promise();

        return createResponse(200, pet.toDbJson());
    } catch (error) {
        return createResponse(500, { message: 'Unexpected error occurred', error: error.toString() });
    }

};
