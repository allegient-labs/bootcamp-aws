const { Pet, createResponse, dynamo } = require('@dmi-bootcamp/pet-layer');

const tableName = process.env.TABLE_NAME;

exports.lambdaHandler = async (event) => {
    try {
        const bodyJson = JSON.parse(event.body);
        const pet = new Pet(bodyJson);
        let params = {
            TableName: tableName,
            Item: pet.toDbJson(),
        };

        await dynamo.put(params).promise();
        return createResponse(200, pet.toDbJson());
    } catch (error) {
        console.error(error);
        return createResponse(500, { message: 'Unexpected error occurred', error: error.toString() });
    }
};