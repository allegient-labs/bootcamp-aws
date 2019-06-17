const { createResponse, dynamo } = require('@dmi-bootcamp/pet-layer');

const tableName = process.env.TABLE_NAME;


exports.lambdaHandler = async (event) => {
    let params = {
        TableName: tableName,
        Key: {
            id: event.pathParameters.petId
        }
    };

    try {
        const awsData = await dynamo.get(params).promise();
        if (!awsData.Item) {
            return createResponse(404, { message: 'Pet not found', response: awsData });
        }
        return createResponse(200, awsData.Item);
    } catch (error) {
        return createResponse(500, { message: 'Unexpected error occurred', error: error.toString() });
    }
};