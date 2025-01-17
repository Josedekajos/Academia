import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Dashboard from "../pages/Dashboard"; 
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import React from 'react';
     
    describe("Testing the dashboard ", () =>  {

        it("renders the dashboard component", () => {
            render(
                <MemoryRouter>
                    <Dashboard />
                </MemoryRouter>
            );
            expect(screen.getByText(/Welcome back/i)).toBeInTheDocument(); 
        });

        it("renders the dashboard text properly", () => { 
            render(
                <MemoryRouter>
                    <Dashboard />
                </MemoryRouter>
            ); 
            expect(screen.getByText(/Academia/i)).toBeInTheDocument();
        });

    });
