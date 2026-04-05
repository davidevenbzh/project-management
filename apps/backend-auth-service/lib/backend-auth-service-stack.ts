import * as cdk from "aws-cdk-lib/core";
import type { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

/**
 * Backend Authentication Service Stack
 *
 * Defines the AWS CDK stack for the backend authentication service.
 */
export class BackendAuthServiceStack extends cdk.Stack {
  /**
   * Creates a new BackendAuthServiceStack instance.
   * @param scope - The construct scope
   * @param id - The construct id
   * @param props - Optional stack properties
   */
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    console.log("BackendAuthServiceStack initialized");

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'BackendAuthServiceQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
