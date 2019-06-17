const { createResponse, dynamo } = require('@dmi-bootcamp/pet-layer');

const tableName = process.env.TABLE_NAME;

exports.lambdaHandler = async () => {
    let params = {
        TableName: tableName,
    };

    try {
        const awsData = await dynamo.scan(params).promise();

        if (!awsData.Items) {
            return createResponse(500, { message: 'Unexpected response from DynamoDB received', response: awsData });
        }

        return createResponse(200, awsData.Items);
    } catch (error) {
        return createResponse(500, { message: 'Unexpected error occurred', error: error.toString() });
    }
};
