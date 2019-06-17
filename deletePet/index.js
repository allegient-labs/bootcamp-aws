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
        const awsData = await dynamo.delete(params).promise();

        if (!awsData.Attributes) {
            return createResponse(404, { message: 'ID not found' });
        }
        return createResponse(200, null);
    } catch (error) {
        console.error(error);
        return createResponse(500, { message: 'Unexpected error occurred', error: error.toString()});
    }
};
