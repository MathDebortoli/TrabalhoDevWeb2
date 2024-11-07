package trabalho.dev.web.model.domain;

import java.util.Date;

public class ClienteDomain {

    private String nome;
    private char sexo;
    private String cpf;
    private String rua;
    private int numero;
    private int telefone;
    private Date dataNascimento;

    public ClienteDomain() {
    }

    public ClienteDomain(String nome, char sexo, String cpf, String rua, int numero, int telefone, Date dataNascimento) {
        this.nome = nome;
        this.sexo = sexo;
        this.cpf = cpf;
        this.rua = rua;
        this.numero = numero;
        this.telefone = telefone;
        this.dataNascimento = dataNascimento;
    }

    public ClienteDomain (String nome, char sexo, Date dataNascimento) {
        this.nome = nome;
        this.sexo = sexo;
        this.dataNascimento = dataNascimento;
    }
}
