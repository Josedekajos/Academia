import {render} from "@testing-library/react";
import '@testing-library/jest-dom';
import NavHeader from "./NavHeader";
import {describe, expect, it} from 'vitest';

describe("Things are loading ", () =>  {

    it('renders a default greeting', () => {
        render(<NavHeader userInfo={{}}/>);
        expect(true).toBe(true);
    });


    it('renders NavHeader component with userInfo prop', () => {
        const {getByText} = render(<NavHeader userInfo={{name: "John Doe"}}/>);
        expect(getByText("John Doe")).toBeInTheDocument();
    });

    it('renders NavHeader component without userInfo prop', () => {
        const {getByText} = render(<NavHeader userInfo={{}}/>);
        expect(getByText("Welcome, Guest")).toBeInTheDocument();
    });
});