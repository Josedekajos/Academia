import {expect, test} from 'vitest'
import {sum} from '../sum.js'
// eslint-disable-next-line no-unused-vars
import React from 'react';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})

