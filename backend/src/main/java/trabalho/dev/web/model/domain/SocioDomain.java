package trabalho.dev.web.model.domain;

import java.util.Date;

public class SocioDomain extends ClienteDomain{
    private DependenteDomain dep1;
    private DependenteDomain dep2;
    private DependenteDomain dep3;

    public SocioDomain() {
    }

    public SocioDomain(String nome, char sexo, String cpf, String rua, int numero, int telefone, Date dataNascimento) {
        super(nome, sexo, cpf, rua, numero, telefone,dataNascimento);
    }
}
