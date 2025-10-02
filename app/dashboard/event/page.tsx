"use client";

import { Card, CardContent } from "@/components/ui/card";
import { textVariants } from "@/style/text";
import { Icon, IconBowlSpoon, IconCheck, IconProps, IconShirt, IconToolsKitchen, IconToolsKitchen2 } from "@tabler/icons-react"
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import Link from "next/link";

export interface ParticipantData {
    id: string
    code?: string
    name: string
    image?: string
    type: string
    package: string
    dinner: Record<string, any>
    breakfast: Record<string, any>
    launch1: Record<string, any>
    launch2: Record<string, any>
    extra: Record<string, any>
    createAt: string
    updateAt: string
}

interface featureItemLinkProps {
    feature: string
    title: string,
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
    iconColor: string;
}

function FeatureItemLink({ title, feature, icon: Icon, iconColor }: featureItemLinkProps) {
    return (
        <Link href={`/dashboard/event/${feature}`} className="block">
            <Card>
                <CardContent className="flex items-center justify-between">
                    <div className="mr-2">
                        <Icon style={{ color: iconColor }} />
                    </div>
                    <div className="flex-1">
                        <h3 className={textVariants({})}>{title}</h3>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default function EventListPage() {
    return (
        <div className="w-full max-w-3xl mx-auto px-6 py-4 space-y-4">
            <header>
                <h1 className={textVariants({ size: "h3" })}>Selecciona un evento</h1>
                <p className={textVariants({ color: "secondary" })}>Para un registro masivo</p>
            </header>
            <section className="space-y-4">
                <FeatureItemLink iconColor="#4285F4" icon={IconShirt} title="Accesorios" feature="extra"/>
                <FeatureItemLink iconColor="#EA4335" icon={IconToolsKitchen2} title="Almuerzo dia 1" feature="launch1" />
                <FeatureItemLink iconColor="#FBBC05" icon={IconToolsKitchen} title="Cena" feature="dinner" />
                <FeatureItemLink iconColor="#34A853" icon={IconBowlSpoon} title="Desayuno" feature="breakfast" />
                <FeatureItemLink iconColor="#673AB7" icon={IconToolsKitchen2} title="Almuerzo dia 2" feature="launch2" />
            </section>
        </div>
    )
}