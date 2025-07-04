SECTION .data

    extern _printf
    global _main

fmt:
    db "%d", 10, 0

SECTION .text

_main:
    mov     eax, 14
    mov     ebx, 10
    add     eax, ebx

    push    eax
    push    fmt
    call    _printf
    add     esp, 8

    mov     eax, 1
    ret           
