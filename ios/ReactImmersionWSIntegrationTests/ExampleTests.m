//
//  ExampleTests.m
//  ReactImmersionWS
//
//  Created by Robin Thrift on 04/11/2015.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <XCTest/XCTest.h>

#import <RCTTest/RCTTestRunner.h>

#import "RCTAssert.h"

#define RCT_TEST(name)                  \
- (void)test##name                      \
{                                       \
[_runner runTest:_cmd module:@#name]; \
}

@interface ExampleTests : XCTestCase

@end


@implementation ExampleTests
{
  RCTTestRunner *_runner;
}

- (void)setUp
{
  [super setUp];
  
  // Put setup code here. This method is called before the invocation of each test method in the class.
  
  // In UI tests it is usually best to stop immediately when a failure occurs.
  self.continueAfterFailure = NO;
  
  // get the ui runner
  _runner = RCTInitRunnerForApp(@"intTestDist/tests.int", nil);
  
  // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
//  [[[XCUIApplication alloc] init] launch];
  // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
  
}

- (void)tearDown
{
  // Put teardown code here. This method is called after the invocation of each test method in the class.
  [super tearDown];
}

RCT_TEST(ExampleTests)
RCT_TEST(ConfigServiceTest)

@end
